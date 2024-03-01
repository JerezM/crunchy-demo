#!/bin/bash

# Verificar si la imagen de PostgreSQL ya está presente localmente
if [[ "$(docker images -q postgres 2> /dev/null)" == "" ]]; then
    echo "La imagen de PostgreSQL no está presente. Descargando..."
    docker pull postgres
else
    echo "La imagen de PostgreSQL ya está presente. No se requiere descarga."
fi

# Verificar si ya existe y está corriendo un contenedor llamado "practice_postgres"
if [[ "$(docker ps -q -f name=practice_postgres)" ]]; then
    echo "Ya existe un contenedor en ejecución con el nombre 'practice_postgres'. No se creará uno nuevo."
else
    # Crear y ejecutar el contenedor de PostgreSQL en caso de que no exista
    echo "Creando y ejecutando el contenedor 'practice_postgres'..."
    docker run --name practice_postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -d postgres -p 5432:5432

    # Esperar unos segundos para asegurar que el contenedor esté completamente ejecutado
    echo "Esperando a que PostgreSQL se inicie..."
    sleep 5
fi

# Conectar al contenedor de PostgreSQL y crear la base de datos
echo "Creando la base de datos 'crunchy_practice'..."
docker exec -it practice_postgres psql -U user -d postgres -c "CREATE DATABASE crunchy_practice;"

echo "Base de datos 'crunchy_practice' creada exitosamente."

#echo "Corriendo migraciones"
#./run-migrations.sh

#echo "Recreando data de ejemplo"
#./recreate-sample-data.sh
