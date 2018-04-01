
import fdk
import json
import os


# def handler(ctx, data=None, loop=None):
#     body = json.loads(data) if len(data) > 0 else {"name": "World"}
#     return "Hello {0}".format(body.get("name"))

def handler(ctx, data=None, loop=None):
    # print("inside handler function")
    body = json.loads(data)
    code = body.get('code')
    cwd = os.getcwd()
    # with open('writeTmp.py', 'r+') as f:
    #     f.write(code)
    # f.closed
    # f = open('~/writeTmp.py', 'r+')
    # f.write('hello there sailor')
    # f.closed()
    return cwd



if __name__ == "__main__":
    fdk.handle(handler)
