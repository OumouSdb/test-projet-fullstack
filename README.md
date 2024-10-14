# Yoga

## Start the project

Launching test:

npm run test

For following change:

npm run test:watch

### Pour installer la base de données:

Utiliser un serveur, par exemple : Laragon, XAMPP, LAAMP.  
Depuis PhpMyAdmin, créez votre base de données et connectez celle-ci à votre application backend en lui fournissant le nom de la BDD ainsi que le chemin.  
Veillez à utiliser MySQL sur le port 3306.

### Pour lancer votre application Front end

Lancez le serveur puis le back-end à l'aide de cette commande :

mvn clean install  # Pour le back-end  
ng serve           # Pour le front-end

### Pour se connecter à l'application

1. Ajoutez un nouvel utilisateur.  
2. Connectez-vous.  
3. Testez l'application en créant, supprimant et modifiant une session.

### Pour lancer les différents tests

Il suffit de taper dans le terminal :

nxp run test

Pour la couverture de test avec Jest :

npm jest --coverage

Pour Cypress :

nom e2e coverage

### Pour changer la version de Node.js

Installez nvm afin de changer de version.
