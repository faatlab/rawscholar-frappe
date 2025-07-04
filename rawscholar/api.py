# # your_app/api.py

# import requests
# import frappe

# def send_whatsapp_message(phone_number):
#     url = "https://graph.facebook.com/v20.0/414438668418219/messages"
#     headers = {
#         'Authorization': 'Bearer EAAR0jjrohrUBO94NXhHUrJo2jOywAsVdzEH3POoXfFxVSxOVw4ydMyvrXohhFejhpuZByjzNRtFlKlnzeHuP5ml4ka6wXQI0qEsDPXh5YiEZAPbEsPcFq1Qax6L7K6poIvFUJ7ZCqral5pHipR8QdnZAIhxOHzTOUe3RjXYNIyaovqPcYZAFWWYgdZCrEL24fcMWiP48pZCZBCBlcsltBlD4YlNpIiR2F3Nwaz4ZD',
#         'Content-Type': 'application/json'
#     }
#     payload = {
#         "messaging_product": "whatsapp",
#         "to": phone_number,
#         "type": "template",
#         "template": {
#             "name": "hello_world",
#             "language": {
#                 "code": "en_US"
#             }
#         }
#     }


#     response = requests.post(url, json=payload, headers=headers)
#     if response.status_code == 200:
#         frappe.msgprint("WhatsApp message sent successfully.")
#     else:
#         frappe.throw("Failed to send WhatsApp message. Error: " + phone_number + response.text)

# def send_welcome_message(doc, method):
#     # doc is the document object
#     phone_number = doc.phone
#     send_whatsapp_message(phone_number)
