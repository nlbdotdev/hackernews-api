// Requirements

// Your website loads at least the 100 current top stories on Hacker News and displays their titles on the page

// Each story's title should be a link to the story's URL

// Adjacent to the story's title, the story's score, number of comments, and author's username should be visible

// Your site should look at least a little nicer than the real Hacker News (Bootstrap!)

// Your site should be responsive (mobile friendly) and use at least one CSS media query to change style rules based on screen size

const url = 'https://dog.ceo/api/breeds/image/random';

const url_topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

getNews()


// const url = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty'


function getStoryLink (num) {
    return `https://hacker-news.firebaseio.com/v0/item/${num}.json?print=pretty`
}

async function getNews() {

    // Get top 100 stories
    const apiData = await fetch(url_topStories);
    const top500 = await apiData.json();
    const top100 = top500.slice(0,99)


    console.log(top100)

    console.log(top500)
    console.log(top500[1])


    console.log(getStoryLink(top100[0]))

    // for all 100, create element




    
    // for (const story of top100) {

    //     const story = await fetch(url_topStories);
    //     const storyData = await apiData.json();

    //     createStory(story.)


    // }

    for (let i = 0; i < top100.length; i++) {

        let url = getStoryLink(top100[i])

        const storyData = await fetch(url);
        const data = await storyData.json();

        createStory(data.title, data.url, data.by, data.score, data.kids === undefined ? 0 : data.kids.length)
        
    }

}




const stories = $('.stories')

const storyTemplate = $('.story')

console.log(storyTemplate.find('*'))

const yeet = storyTemplate.find('*')

createStory()

createStory()

createStory()

function createStory(title, url, author, points, comments) {

    console.log(title, url, author, points, comments)

    // const story = $('<div class="story">')

    // special thing for comments

    const story = $(`
    <div class="story">
    <div class="story-thumbnail">
        <div class="story-num">1.</div>
    </div>
    <div class="story-content">
        <div class="story-heading">
            <div class="story-title">${title}</div>
        </div>
        <div class="story-subheading">
            <div class="story-author">${author}</div>
            <div class="story-points">${points} points</div>
            <div class="story-comments">${comments} comments</div>
        </div>
    </div>
    `)

    if (comments === 0) {
        story.find('story-comments').remove()
        console.warn("YEET")
    }



    stories.append(story)
}