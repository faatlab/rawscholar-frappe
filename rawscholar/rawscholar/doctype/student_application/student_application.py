# Copyright (c) 2024, Rawscholar dev team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class StudentApplication(Document):
	def autoname(self):
		if not self.student:
			frappe.throw("Student is required to generate the application name")
	
		# Count existing applications for this student
		count = frappe.db.count("Student Application", {"student": self.student}) + 1

		# Format number with leading zeroes (01, 02, etc.)
		sequence = f"{count:02d}"

		# Set the name using student name and sequence
		self.name = f"{self.student}-{sequence}"
