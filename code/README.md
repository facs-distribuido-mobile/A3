# Instruções

Para ativar o ambiente docker, utilize o comando (nesta pasta!):

```
docker compose up -d
```

Para interromper os containers:

```
docker compose stop
```

Para deletar os containers:

```
docker compose down
```

Para deletar os containers e imagens relacionados:

```
docker compose down --rmi all
```

Para deletar os containers, imagens e volumes relacionados (ação destrutiva):

```
docker compose down --volumes --rmi all
```

Nota: os arquivos .env contêm informações sensíveis e não devem ser commitados, mas, neste caso abriu-se uma exceção para facilitar a avaliação.