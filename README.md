# Eurotransit
Interactive visualizations of the transit in Europe using D3.js and Chart.js. See the live app on [dvcarrillo.com/eurotransit](http://www.dvcarrillo.com/eurotransit).

## Development
Run server in development mode: `npm start`.


Any new development should be done in the ```dev``` branch or in feature branches, then pushed to ```main``` via pull requests.  
## Deployment
This project uses the package ```gh-pages``` for deployment. Therefore, if you wish to publish the application, run the ```deploy``` script or:
```
gh-pages -d build
```
**UPDATE:** deployment is automated via a GitHub action on every accepted PR to ```main```. 
## Found an issue?
Please, report it on the [Issues page](https://github.com/dvcarrillo/eurotransit/issues).
