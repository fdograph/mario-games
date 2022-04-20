import { publish } from 'gh-pages';

publish(
	'build',
	{
		branch: 'gh-pages',
		repo: 'git@github.com:fdograph/mario-games.git',
		dotfiles: true
	},
	() => {
		console.log('Deploy to Github Pages Complete!');
	}
);
