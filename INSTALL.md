# Yellow Registration Server - installation and configuration

These are the installation instructions of this software for the different Linux distributions.

## 1. Prerequisities

You need to have your [**Yellow Server**](https://github.com/libersoft-org/yellow-documentation/) and [**Yellow Server - Module Profile**](https://github.com/libersoft-org/yellow-server-module-profile/) installed and configured on your server.

## 2. Installation

Log in as "root" on your server and run the following commands to download the necessary dependencies and the latest version of this software from GitHub:

### Debian / Ubuntu Linux

```sh
apt update
apt -y upgrade
git clone https://github.com/libersoft-org/yellow-registration-server.git
cd yellow-registration-server/src/
```

### CentOS / RHEL / Fedora Linux

```sh
dnf -y update
git clone https://github.com/libersoft-org/yellow-registration-server.git
cd yellow-registration-server/src/
```

## 3. Configuration

### Create the settings file:

```sh
./start.sh --create-settings
```

... and edit it to set up the database credentials and network port

### To edit additional configuration, just edit the "settings.json" file:

- **web** section:
  - **http_port** - your HTTP server's network port
  - **allow_network** - allow to run the web server through network (not just localhost)
- **database** section:
  - **server** - your Yellow Server (core) database:
    - **host** - database host name
    - **port** - database network port
    - **user** - database user name
    - **password** - database password
    - **name** - database name
  - **module_profiles** - your Yellow Server - Module Profile database:
    - **host** - database host name
    - **port** - database network port
    - **user** - database user name
    - **password** - database password
    - **name** - database name
- **other** section:
  - **log_file** - the path to your log file (ignored if log_to_file is false)
  - **log_to_file** - if you'd like to log to console and log file (true) or to console only (false)

## 4. Start the server

a) to start the module in **console**:

```bash
./start.sh
```

b) to start the module in **console** in **hot reload** (dev) mode:

```bash
./start-hot.sh
```

c) to start the module in **screen**:

```bash
./start-screen.sh
```

d) to start the module in **screen** in **hot reload** (dev) mode:

```bash
./start-hot-screen.sh
```

To detach screen press **CTRL+A** and then **CTRL+D**.

To stop the module just press **CTRL+C**.
