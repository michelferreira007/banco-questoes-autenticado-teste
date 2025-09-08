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

echo "--- INICIANDO COMANDOS DO BANCO DE DADOS ---"
# Este comando CRIA a tabela antes de tudo.
flask db upgrade

echo "--- EXECUTANDO SCRIPT PARA POPULAR O BANCO DE DADOS ---"
# Este comando INSERE os dados na tabela que acabou de ser criada.
python populate_questoes_novas.py

echo "Build concluído com sucesso!"

