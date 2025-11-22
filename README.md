
curl --location 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=TESTVVUAT_2502041721357207510164' \
--data-urlencode 'client_version=1' \
--data-urlencode 'client_secret=ZTcxNDQyZjUtZjQ3Mi00MjJmLTgzOWYtMWZmZWQ2ZjdkMzVi' \
--data-urlencode 'grant_type=client_credentials'

Response -

{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzT24iOjE3NDIyODgxMTkxMzcsIm1lcmNoYW50SWQiOiJURVNUVlZVQVQifQ.xZ0a3c3pr6fXlB1W31tOZRYm2KBY_E-YKZXj6eMLXAA","encrypted_access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzT24iOjE3NDIyODgxMTkxMzcsIm1lcmNoYW50SWQiOiJURVNUVlZVQVQifQ.xZ0a3c3pr6fXlB1W31tOZRYm2KBY_E-YKZXj6eMLXAA","expires_in":3600,"issued_at":1742284519,"expires_at":1742288119,"session_expires_at":1742288119,"token_type":"O-Bearer"}

Pay Init API -

curl --location 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay' \
--header 'Content-Type: application/json' \
--header 'Authorization: O-Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzT24iOjE3NDIyODgxMTkxMzcsIm1lcmNoYW50SWQiOiJURVNUVlZVQVQifQ.xZ0a3c3pr6fXlB1W31tOZRYm2KBY_E-YKZXj6eMLXAA' \
--data '{
    "merchantOrderId": "TX123456",
    "amount": 1000,
    "expireAfter": 1200,
    "metaInfo": {
        "udf1": "additional-information-1",
        "udf2": "additional-information-2",
        "udf3": "additional-information-3",
        "udf4": "additional-information-4",
        "udf5": "additional-information-5"
    },
    "paymentFlow": {
        "type": "PG_CHECKOUT",
        "message": "Payment message used for collect requests",
        "merchantUrls": {
            "redirectUrl": ""
        }
    } 
}'

Response -

{"orderId":"OMO2503181326267578132618","state":"PENDING","expireAt":1742457386759,"redirectUrl":"https://mercury-uat.phonepe.com/transact/uat_v2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzT24iOjE3NDIzMDc5ODY3NTgsIm1lcmNoYW50SWQiOiJURVNUVlZVQVQiLCJtZXJjaGFudE9yZGVySWQiOiJUWDEyMzQ1NiJ9.lzwOainaucpHB_ZywvDrcAK3HYyjEUBU4l4a-GFHpA8"}

 