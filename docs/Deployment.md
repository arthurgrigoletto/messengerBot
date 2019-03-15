# Deployment

## Prerequisites

- [IBMCloud CLI](https://console.bluemix.net/docs/cli/reference/ibmcloud/download_cli.html#install_use)

- [IBM Cloud Account](https://console.bluemix.net/)

### Manifest.yml

Os manifests do aplicativo incluem opções que são aplicadas ao comando cf push. É possível usar um manifest do aplicativo para reduzir o número de detalhes de implementação que deve-se especificar toda vez que enviar por push um aplicativo para o IBM Cloud.

Em manifests do aplicativo, é possível especificar opções como o número de instâncias do aplicativo a serem criadas, a quantia de memória e a cota do disco a serem alocadas e outras variáveis de ambiente. É possível também usar manifests do aplicativo para automatizar implementações de aplicativos. O nome padrão de um arquivo manifest é manifest.yml.

Para saber mais [clique aqui](https://console.bluemix.net/docs/cloud-foundry/deploy-apps.html#appmanifest).

- MacOs / **Linux**

  ```bash
    cd myServerFolder
    touch manifest.yml
  ```

- Windows

  ```bash
    cd myServerFolder
    fsutil file createnew manifest.yml 0
  ```

#### Example

```manifest
---
applications:
- name: <APP_NAME>
  memory: 256M
  instances: 1
  host: <APP_HOST>
```

### Push

No terminal ou linha de comando executar:

`ibmcloud login --sso`

#### _Se for a primeira vez logando, selecione a url para US-South_

Copie e cole no terminal ou linha de comando o código único para sua conta (é necessário estar logado na IBM Cloud)

`ibmcloud target --cf`

Selecione o espaço da Cloud Foundry que deseja subir a app. Após isso execute o comando abaixo:

`ibmcloud cf push`

---

### Logs

Para ver os logs da aplicação basta executar:

```bash
ibmcloud cf logs <APP_NAME> // Mostra em tempo real os logs
ibmcloud cf logs <APP_NAME> --recent // Mostra os últimos logs da aplicação
```
