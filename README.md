This project was created for fun.

## Install backend environment

### Firstful need install Anaconda v3.5.2.0

#### linux:

- [x86-64](https://repo.anaconda.com/archive/Anaconda3-5.2.0-Linux-x86_64.sh)
- [x32](https://repo.anaconda.com/archive/Anaconda3-5.2.0-Linux-x86.sh)

#### Windows:

- [x64](https://repo.anaconda.com/archive/Anaconda3-5.2.0-Windows-x86_64.exe)
- [x32](https://repo.anaconda.com/archive/Anaconda3-5.2.0-Windows-x86.exe)

### Secondful install package dependencies

```sh
conda install -c conda-forge dlib
```

## Install frontend

if use yarn:

```
yarn install
```

if use npm:

```
npm install
```

## Run App

#### backend:

```bash
python ./backend/innoprom_server.py
```

#### frontend

```bash
npm run start
```
