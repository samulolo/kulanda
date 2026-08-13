import requests 
from dotenv import load_dotenv
import os


load_dotenv()

ACCESS_TOKEN = os.environ.get("CJ_ACCESS_TOKEN")
CJ_API_KEY = os.environ.get("CJ_API_KEY")

def get_access_token():

    URL = "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken"

    if not CJ_API_KEY:
        print("Falta CJ_API_KEY no .env")
        return

    try :

        response = requests.post(URL, headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {CJ_API_KEY}'
        })

        if response.status_code != 200:
            print("Não foi possível obter o access_token")
            return

        return response.json()
        

    except Exception as e: 
        print("Houve um erro ao obter o access_token: ", str(e))



def get_produts(param : str = 'getCategory'):

    URL = f'https://developers.cjdropshipping.com/api2.0/v1/product/{param}'

    response = requests.get(URL, headers={
        'CJ-Access-Token': ACCESS_TOKEN
    })

    return response.json()

def extract_categories_id(categories : list):

    first_categories_id = {}

    for category in categories:
        first_categories_id[category['categoryFirstName']] = category['categoryFirstId']

    return first_categories_id


data : dict = get_produts()


cat = extract_categories_id(data['data'])
print("Nomes e id's da categoria: ", cat)

# for cat in data['data']:
#     print(cat['categoryFirstName'])
