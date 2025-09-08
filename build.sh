#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Instalando dependências do Python..."
pip install -r requirements.txt

echo "Instalando e fazendo build do frontend..."
cd frontend
npm install -g pnpm
pnpm install
pnpm build
cp -r dist/. ../src/static/
cd ..
echo "Build do frontend concluído!"

echo "--- EXECUTANDO SCRIPT PARA POPULAR O BANCO DE DADOS ---"
# Agora ele só popula. A criação da tabela será feita pelo main.py
python populate_questoes_novas.py

echo "Build concluído com sucesso!"

