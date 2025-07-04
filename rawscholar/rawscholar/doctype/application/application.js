// Copyright (c) 2024, Rawscholar dev team and contributors
// For license information, please see license.txt

frappe.ui.form.on("Application", {
	refresh(frm) {
        frm.set_query('university',(doc) =>{
            return {
                filters: {
                    "country": doc.country
                }
            }
        })

        frm.set_query('course',(doc) =>{
            return {
                filters: {
                    "university": doc.university
                }
            }
        })
        frm.add_custom_button(__("Student Profile"), function () {
            if (frm.doc.student) {
                frappe.set_route('Form', 'Student', frm.doc.student);
            } else {
                frappe.msgprint(__('Please select a student first.'));
            }
        });
        
        

	},
});
