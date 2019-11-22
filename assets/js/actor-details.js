import {
    LoadData
} from './load-data/load-api-data.js';
import {
    findGetParameter,
    image_base_url,

} from './app-common-functions/utilities.js';
import {
    header,
} from './app-common-functions/header.js';

async function movieActorDetails() {
    const id = findGetParameter('id');

    var actorData = new LoadData();

    if (id) {
        const actorDetails = await actorData.loadActorDetails(id);

        // for movie actor detials
        const template = document.getElementById("actor-details");
        const details = template.content.querySelector("div");
        const nodeActor = document.importNode(details, true);

        const description = nodeActor.querySelector('.para-actor .actor__bio');
        description.append(document.createTextNode(actorDetails.biography));

        const dobActor = nodeActor.querySelector('.para-actor .actor__dob');
        dobActor.append(document.createTextNode(actorDetails.birthday));

        const nameActor = nodeActor.querySelector('.para-actor h2');
        nameActor.append(document.createTextNode(actorDetails.name));
 
        const actorPoster = nodeActor.querySelector('.actor_poster .actor-image img');
        console.log(actorPoster)
        actorPoster.setAttribute("src", image_base_url + actorDetails.profile_path);
        actorPoster.setAttribute("alt", actorDetails.name);
        actorPoster.setAttribute("title", actorDetails.name);


        // get all years
        var filmo = await actorData.loadActorFilmography(id);
        filmo = filmo.cast.map(item => {
            item.year = item.release_date ? parseInt(item.release_date.split('-')[0]) : '';
            return item;
        });

        //sort year
        filmo.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

        let groupedFimlo = [];
        let years = [];

        // create new updated array
        for (var i = 0; i < filmo.length; i++) {
            if (years.includes(filmo[i].year)) {
                groupedFimlo.map(item => {
                    if (item.year == filmo[i].year) item.films.push(filmo[i]);
                    else return item;
                });
            } else {
                years.push(filmo[i].year);
                groupedFimlo.push({
                    year: filmo[i].year,
                    films: [filmo[i]]
                })
            }
        }

        // create html for actor filmography
        for (let i = 0; i < groupedFimlo.length; i++) {
            if (groupedFimlo[i].year) {
                const Movieyear = document.querySelector('.year');

                let article = document.createElement('article');
                article.setAttribute("class", "movie__year");
                Movieyear.append(article);

                let yearHeading = document.createElement('h2');
                let yeardiv = document.createElement('div');
                yeardiv.setAttribute("class", "year__content")
                article.append(yeardiv);
                yeardiv.append(yearHeading);
                
                yearHeading.append(document.createTextNode(groupedFimlo[i].year));
                yeardiv.append(yearHeading);
                let actorDetailsDiv = document.createElement('div');
                actorDetailsDiv.setAttribute("class", "actor__content")
                article.append(actorDetailsDiv);

                for (var j = 0; j < groupedFimlo[i].films.length; j++) {
                    const movieyeardata = document.querySelector('.year');
                    var section = document.createElement('section');
                    section.setAttribute("class", "moviesby__year");
                    movieyeardata.append(section);
                    article.append(section);
                    actorDetailsDiv.append(section);
                    var h2 = document.createElement('p');
                    h2.setAttribute("class", "years-text");
                    h2.append(document.createTextNode('Title: '));
                    h2.append(document.createTextNode(groupedFimlo[i].films[j].title));
                    section.append(h2);

                    var movieYear = document.createElement('p');
                    movieYear.setAttribute("class", "years-text");
                    movieYear.append(document.createTextNode('Year: '));
                    movieYear.append(document.createTextNode(groupedFimlo[i].films[j].year));
                    section.append(movieYear);

                    var movieChar = document.createElement('p');
                    movieChar.setAttribute("class", "years-text");
                    movieChar.append(document.createTextNode('Character: '));
                    movieChar.append(document.createTextNode(groupedFimlo[i].films[j].character));
                    section.append(movieChar);
                }
            }
        }
        document.getElementById('actor-main-details').append(nodeActor);

    }
}
header();
movieActorDetails();