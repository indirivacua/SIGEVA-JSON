# Contribuir

El repo usa un git hook versionado (en `.githooks/`) que avisa si vas a pushear sin haber subido la versión en `src/manifest.json`. Activalo una vez después de clonar:

```bash
git config core.hooksPath .githooks
```

Para saltarlo puntualmente: `git push --no-verify`.