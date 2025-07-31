import frappe
import bcrypt
import jwt 
from datetime import datetime, timedelta, timezone
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from frappe import _

secret_key = frappe.get_conf().get("jwt_secret_key")

@frappe.whitelist(allow_guest=True)  # Allow API calls from React frontend
def verify_student_login(email, password, exp_days):
    student = frappe.db.get_value("Student", {"email": email}, ["name", "password"], as_dict=True)

    if not student:
        return{"status": "404", "message": "Account not found"}

    stored_hash = student.password.encode("utf-8")
    entered_password = password.encode("utf-8")
    exp_days = int(exp_days)

    if bcrypt.checkpw(entered_password, stored_hash): 
        expiration_time = timedelta(days=exp_days)
        payload = {
            "student_id": student.name,
            "exp": datetime.now(timezone.utc) + expiration_time,
        }
        token = jwt.encode(payload, secret_key, algorithm="HS256")

        return {
            "status": "200",
            "message": "You have been logged in successfully",
            "student_id": student.name,
            "token": token,  # Return the token to the frontend
        }
    else:
        return{"status": "401", "message": "Invalid credentials"}


@frappe.whitelist(allow_guest=True)
def signup_student(email, password, name1, phone):
    # Check if the email already exists
    existing_student = frappe.db.exists("Student", {"email": email})
    if existing_student:
        return {"status": "400", "message": "Email already registered"}

    # Create the student record
    student = frappe.get_doc({
        "doctype": "Student",
        "email": email,
        "password": password,  
        "name1": name1,
        "phone":phone
    })
    student.insert(ignore_permissions=True)
 
    # Generate JWT token for authentication
    expiration_time = timedelta(days=2)
    payload = {
        "student_id": student.name,
        "exp": datetime.now(timezone.utc) + expiration_time,
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256")

    return {
        "status": "200",
        "message": "Account created successfully",
        "student_id": student.name,
        "token": token  # Return the token to the frontend
    }

@frappe.whitelist(allow_guest=True)
def authenticate_request():
    """Verify JWT from Authorization header and return student_id"""
    auth_header = frappe.get_request_header("JWTAuthentication")
      
    if not auth_header or not auth_header.startswith("JWT "):
        frappe.throw("Missing or invalid Authorization header", frappe.AuthenticationError)

    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(token, secret_key, algorithms="HS256")
        student_id = decoded.get("student_id")
        if not student_id:
            frappe.throw("Invalid token payload", frappe.AuthenticationError)
        return {"status":"200", "student_id":student_id}

    except ExpiredSignatureError:
        frappe.throw("Access token expired", frappe.AuthenticationError)
    except InvalidTokenError:
        frappe.throw("Invalid token", frappe.AuthenticationError)