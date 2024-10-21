# Instructions pour démarrer le projet

## Installation

1. **Installer les dépendances et compiler le projet** :  
   Exécutez la commande suivante pour nettoyer le projet et installer les dépendances :  


2. **Lancer les tests** :  
   Une fois l'installation terminée, exécutez les tests pour vérifier le bon fonctionnement du projet.

3. **Démarrer le serveur** :  
   Démarrez un serveur, par exemple Laragon, sur le port 3306.

4. **Créer la base de données et la connecter à l'application** :  
   Configurez la base de données et assurez-vous qu'elle est bien connectée à l'application.

5. **Tester l'API** :  
   Vérifiez le bon fonctionnement de l'API en réalisant des tests de requêtes.

6. **Examiner le code et les dépendances** :  
   Prenez le temps de parcourir le code et les dépendances définies dans le `pom.xml`.

## Structure des tests

- Pour les tests, créez des packages pour chaque classe à tester :  
  Dans le répertoire `test`, différents packages sont organisés comme suit :
- `controllers`
- `securityJWT`
- `services`

- Chaque package contient des classes qui testent différentes méthodes de l'application.
- Ces classes utilisent des mocks afin de simuler les dépendances.

## Configuration du `pom.xml` pour la couverture de code

- Modifiez le fichier `pom.xml` pour définir une couverture de code minimale et exclure certaines classes des tests.
- Les classes suivantes ne sont pas couvertes par les tests : `DTO`, `Mapper`, `Exception`, et `payload`.

## Vérification de la couverture des tests

- Après avoir réalisé les tests, exécutez-les tous, puis vérifiez la couverture de code pour vous assurer qu'elle respecte les seuils définis.
