# icp_microblog2

Batch 3, Lesson 5

```bash
dfx new --frontend icp_microblog2

dfx start --background

dfx deploy

dfx canister call icp_microblog2_backend set_name "(\"11234\", \"47A\")"
dfx canister call icp_microblog2_backend_2 set_name "(\"11234\", \"47B\")"


dfx canister call icp_microblog2_backend post "(\"11234\", \"Post 001\")"
dfx canister call icp_microblog2_backend post "(\"11234\", \"Post 002\")"
dfx canister call icp_microblog2_backend post "(\"11234\", \"Post 003\")"

dfx canister call icp_microblog2_backend_2 post "(\"11234\", \"Post 201\")"
dfx canister call icp_microblog2_backend_2 post "(\"11234\", \"Post 202\")"
dfx canister call icp_microblog2_backend_2 post "(\"11234\", \"Post 203\")"

dfx canister call icp_microblog2_backend posts "(0)"

dfx canister call icp_microblog2_backend follow "(principal \"$(dfx canister id icp_microblog2_backend_2)\")"

dfx canister call icp_microblog2_backend_2 follow "(principal \"$(dfx canister id icp_microblog2_backend)\")"

dfx canister call icp_microblog2_backend_2 timeline "(1_665_050_435_067_461_000)"

dfx canister call icp_microblog2_backend_2 follows "()"

dfx stop

```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

