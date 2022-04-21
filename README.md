### Hexlet tests and linter status:
[![Actions Status](https://github.com/vladimir-ioshkin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/vladimir-ioshkin/frontend-project-lvl2/actions)

[![Actions Status](https://github.com/vladimir-ioshkin/frontend-project-lvl1/workflows/linter/badge.svg)](https://github.com/vladimir-ioshkin/frontend-project-lvl2/actions)

### Maintainability codeclimate status:
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/vladimir-ioshkin/frontend-project-lvl2)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/vladimir-ioshkin/frontend-project-lvl2)

## Setup:
```sh
git clone git@github.com:vladimir-ioshkin/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
npm link
```
Получить справку
```sh
gendiff -h
```

### Сравнить файлы
```sh
gendiff file1.json file2.yaml
```

##### Сравнение плоских JSON-файлов
[![asciicast](https://asciinema.org/a/ur6tACu1z9HSOhmVUAPw7Iz3e.svg)](https://asciinema.org/a/ur6tACu1z9HSOhmVUAPw7Iz3e)

##### Сравнение плоских YAML-файлов
[![asciicast](https://asciinema.org/a/wbpLP2R5QnzTANwRw5zD2QbEF.svg)](https://asciinema.org/a/wbpLP2R5QnzTANwRw5zD2QbEF)

##### Глубокое сравнение файлов
[![asciicast](https://asciinema.org/a/jPmkmYY59g96a79Va3Xu7fS8B.svg)](https://asciinema.org/a/jPmkmYY59g96a79Va3Xu7fS8B)

### Форматирование ответа "plain"
```sh
gendiff file1.json file2.yaml -f plain
```
[![asciicast](https://asciinema.org/a/bmjoAZwa3lgQjZjzDlzwMjzCo.svg)](https://asciinema.org/a/bmjoAZwa3lgQjZjzDlzwMjzCo)

### Форматирование ответа "json"
```sh
gendiff file1.json file2.yaml -f json
```
[![asciicast](https://asciinema.org/a/PtA86s9vYkLjkQMU4ArPrNWSC.svg)](https://asciinema.org/a/PtA86s9vYkLjkQMU4ArPrNWSC)
