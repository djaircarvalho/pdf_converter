# pdf_converter

### Imprime qualquer url usando o puppeteer do Google:

####ex:
```
curl --request POST \
  --url https://cryptic-dusk-32651.herokuapp.com/pdf \
  --header 'content-type: application/json' \
  --data '{
	"url": "https://docs.nestjs.com/techniques/logger"
}'

```

caso a página precise de heades como autenticação os mesmos podem ser passados dentro do body como uma lista no atributo "headers"
