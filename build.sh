#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Instalando dependências do Python..."
pip install -r requirements.txt

echo "Instalando Node.js e dependências do frontend..."
# (O build do frontend continua igual)
npm install -g pnpm
cd frontend
pnpm install
pnpm build
cp -r dist/. ../src/static/
cd ..
echo "Build do frontend concluído!"

echo "--- INICIANDO COMANDOS DO BANCO DE DADOS ---"
# Garante que as tabelas sejam criadas/atualizadas ANTES de qualquer outra coisa.
# O comando 'flask db upgrade' é o responsável por criar as tabelas.
flask db upgrade

echo "--- EXECUTANDO SCRIPT PARA POPULAR O BANCO DE DADOS ---"
# Agora, com a certeza de que a tabela existe, executamos o script.
python populate_questoes_novas.py

echo "Build concluído com sucesso!"

