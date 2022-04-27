# Login with QR Code

The login for QR authorization seem very abstract, but it is this simple. The project shall be the basic blueprint for QR authorization implementation.

## How it works

[![](https://mermaid.ink/img/pako:eNqNk0Fv2zAMhf8KoVMGpO7dQAsE2w677GLkZmBQLTpRK0sORSVog_z3UY61JOjW1ScL-vj0-CgdVRcMqlpF3CX0HX6zekN6aD3IpxMHn4YnpPN61MS2s6P2DCvZjrBKvA1k39B8dRY9v-fWGVt7_V-wyWCDtC-nreHuEdY1dISaEVKy5nZjR9BTGP6yE0P3ggzORkYPrbrPx9_rcaSwR9OqC_0ITcErHCwvCryjO8qZRG7VEo7W1NM5py_n2p9BLJHdbBlCnzXGxEXHGuAAFMSa7F3cvauZ-edg_SJjs_Zq8pXb6LS_trqqr4xcs__uIUv43PJnenCSGYcXieyh6M0ZVFvUBilWZY6abfAfyOy1kxge4PnAlUzU9q-LSXkJEWWg_JEFj4dfxUauj3bjF0fAQVtXn5WraQGlk6YkZkPF4ZzlbRSX2UsQk3h9OecmEKEoSx2sN-FQudBp1zAFvcEqIv9gHER1qstif0REQy3VgCTOjLyoY9YUcIsDtqqWX4O9To7z9TsJmkYj9_q7sRxI1b12EZcqP7nm1XeqZkpYoPlVztTpN5nkPIg)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqNk0Fv2zAMhf8KoVMGpO7dQAsE2w677GLkZmBQLTpRK0sORSVog_z3UY61JOjW1ScL-vj0-CgdVRcMqlpF3CX0HX6zekN6aD3IpxMHn4YnpPN61MS2s6P2DCvZjrBKvA1k39B8dRY9v-fWGVt7_V-wyWCDtC-nreHuEdY1dISaEVKy5nZjR9BTGP6yE0P3ggzORkYPrbrPx9_rcaSwR9OqC_0ITcErHCwvCryjO8qZRG7VEo7W1NM5py_n2p9BLJHdbBlCnzXGxEXHGuAAFMSa7F3cvauZ-edg_SJjs_Zq8pXb6LS_trqqr4xcs__uIUv43PJnenCSGYcXieyh6M0ZVFvUBilWZY6abfAfyOy1kxge4PnAlUzU9q-LSXkJEWWg_JEFj4dfxUauj3bjF0fAQVtXn5WraQGlk6YkZkPF4ZzlbRSX2UsQk3h9OecmEKEoSx2sN-FQudBp1zAFvcEqIv9gHER1qstif0REQy3VgCTOjLyoY9YUcIsDtqqWX4O9To7z9TsJmkYj9_q7sRxI1b12EZcqP7nm1XeqZkpYoPlVztTpN5nkPIg)

## Setup

**Run the websocket server**

```shell
cd server && npm i && npm run dev
```

Now your server is running at http://0.0.0.0:4000. We need to used host "0.0.0.0" to expose the port publicly in the local network so that you can use other device to scan.

**Run the client**

```shell
# Get the machine ip
LOCAL_IP=$(node ip.js)
# Change the endpoint for client to connect
sed -i "s/endpoint\ =\ .*/endpoint\ =\ \"http:\/\/${LOCAL_IP}:4000\"/" client/src/contexts/Socket.jsx
# start the client
cd client && npm i && npm run dev -- --port 3000 --host "0.0.0.0" --open
```

Setup completed, now the client has 3 routes.

`/` is protected. You need to login first.

`/scan` is also protected. You must login to scan to authorized others to login too.

`/login` you can put any emails with password `123`

**NOTE**

-   Your devices must be in the same local network
-   Your phone camera will not work in `/scan` because it required `https` to use this feature for security perposes, so use your computer webcam to scan or implement https by yourself.

## Usage

1. First device, go to `/login` using: example@email.com
2. First device, go to `/scan`
3. Second device, go to `/login` the open the QR tab
4. Second device, one authorization completed, the device with redirect it self to `/` showing JSON below.

```
{ "user": "example@email.com" }
```
