# Copyright (c) 2023, faatlab and contributors
# For license information, please see license.txt

import frappe
import random
import bcrypt
from frappe.desk.notifications import notify_mentions
from frappe.model.document import Document
from frappe.utils import cstr, now, today
from frappe.model.document import Document


def generate_otp():
    """Generate a 6-digit OTP"""
    return str(random.randint(100000, 999999))

@frappe.whitelist(allow_guest=True)
def send_otp_email(email):
    """Send OTP email to the user"""
    otp = generate_otp()
    stored_otp = frappe.cache().get_value(f"otp:{email}")
    if stored_otp:
        frappe.cache().delete_value(f"otp:{email}")

    # Store OTP in cache (expires in 5 minutes)
    frappe.cache().set_value(f"otp:{email}", otp, expires_in_sec=300)

    # Email Content
    subject = f"{otp} Your OTP Code for Verification"
    message = f"""
    Hello,<br><br>

    <strong>{otp}</strong> is your OTP for verification.<br>
    This code is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone for security reasons.<br><br>

    If you did not request this OTP, please ignore this email.<br><br>

    Best regards,<br>
    <strong>Rawscholar</strong><br>
    <a href="https://rawscholar.com">www.rawscholar.com</a> | <a href="mailto:rawscholar@gmail.com">rawscholar@gmail.com</a>
    """
    try:
        # Send Email
        frappe.sendmail(
            recipients=email,
            subject=subject,
            message=message,
            delayed=False
        )
        return {"message": "Verification code sent successfully", "email": email, "otp": otp}
    except Exception as e:
        frappe.log_error(f"OTP Email Error: {str(e)}", "OTP Verification")
        return {"error": "Failed to send Verification code"}

@frappe.whitelist(allow_guest=True)
def verify_otp(email, entered_otp):
    """Verify OTP entered by the user"""
    stored_otp = frappe.cache().get_value(f"otp:{email}")

    if not stored_otp:
        return {"error": "OTP expired or not found","status":"404"}
    
    if entered_otp == stored_otp:
        # OTP is valid, remove from cache
        frappe.cache().delete_value(f"otp:{email}")
        return {"message": "Code verified successfully","status":"200"}
    else:
        return {"error": "Invalid OTP","status":"401"}


class Student(Document):
    def validate(self):
        """Hash the password before saving the Student document"""
        if self.password and not self.password.startswith("$2b$"):  # Prevent double hashing
            self.password = self.hash_password(self.password)
        # self.validate_payments()

    def hash_password(self, password):
        """Generate bcrypt hash for the password"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

    def validate_payments(self):
        # Validate the payments as needed
        pass

    def on_update(self):
        # Additional logic on update, if necessary
        pass

    @frappe.whitelist()
    def add_note(self, title):
        self.append(
            "notes", {"title": title, "added_by": frappe.session.user, "created_on": now()})
        self.save()
        notify_mentions(self.doctype, self.name, title)

    @frappe.whitelist()
    def edit_note(self, note, row_id):
        for d in self.notes:
            if cstr(d.name) == row_id:
                d.title = note
                d.db_update()

    @frappe.whitelist()
    def delete_note(self, row_id):
        for d in self.notes:
            if cstr(d.name) == row_id:
                self.remove(d)
                break
        self.save()

    # qualifications
    @frappe.whitelist()
    def add_qualification(self, qualification, cgpa, percentage, completion_year=None, specifics=None):
        self.append(
            "qualifications", {"qualification": qualification, "cgpa": cgpa, "percentage": percentage, "completion_year": completion_year, "specifics": specifics})
        self.save()

    @frappe.whitelist()
    def edit_qualifications(self, cgpa, percentage, completion_year, specifics, row_id):
        for d in self.qualifications:
            if cstr(d.name) == row_id:
                d.cgpa = cgpa
                d.percentage = percentage
                d.completion_year = completion_year
                d.specifics = specifics
                d.db_update()

    @frappe.whitelist()
    def delete_qualifications(self, row_id):
        for d in self.qualifications:
            if cstr(d.name) == row_id:
                self.remove(d)
                break
        self.save()

    @frappe.whitelist()
    def get_open_activities(self, ref_doctype, ref_docname):

        def get_open_todos(ref_doctype, ref_docname):
            return frappe.get_all(
                "ToDo",
                filters={"reference_type": ref_doctype,
                         "reference_name": ref_docname, "status": "Open"},
                fields=[
                    "name",
                    "description",
                    "allocated_to",
                    "date",
                ],
            )

        def get_open_events(ref_doctype, ref_docname):
            event = frappe.qb.DocType("Event")
            event_link = frappe.qb.DocType("Event Participants")

            query = (
                frappe.qb.from_(event)
                .join(event_link)
                .on(event_link.parent == event.name)
                .select(
                    event.name,
                    event.subject,
                    event.event_category,
                    event.starts_on,
                    event.ends_on,
                    event.description,
                )
                .where(
                    (event_link.reference_doctype == ref_doctype)
                    & (event_link.reference_docname == ref_docname)
                    & (event.status == "Open")
                )
            )
            data = query.run(as_dict=True)

            return data

        tasks = get_open_todos(ref_doctype, ref_docname)
        events = get_open_events(ref_doctype, ref_docname)

        return {"tasks": tasks, "events": events}

    @staticmethod
    def get_query(doctype, txt, searchfield, start, page_len, filters):
        # Customize the query to filter payments based on the selected student
        return f"""
          SELECT name1, amount
          FROM `Payment`
          WHERE Student = '{filters.get('Student')}'
        """
