import base64, sys, os
path = sys.argv[1]
os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)
data = base64.b64decode(sys.argv[2].encode('utf-8'))
with open(path, 'wb') as f:
    f.write(data)
print(f'Successfully wrote {path} ({len(data)} bytes)')
