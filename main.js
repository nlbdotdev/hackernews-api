// Make pretty
// Make work on mobile
// add comment support

// --- URLs ---
const url_topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

function getStoryLink(num) {
    return `https://hacker-news.firebaseio.com/v0/item/${num}.json?print=pretty`
}

// --- Init ---
getNews()


async function getNews() {

    const story_count = 100

    // Get top 100 stories
    const apiData = await fetch(url_topStories);
    const top500 = await apiData.json();
    const top100 = top500.slice(0, story_count)

    // Convert each to a story
    for (let i = 0; i < top100.length; i++) {

        let id = top100[i]

        let url = getStoryLink(id)

        const storyData = await fetch(url);
        const data = await storyData.json();

        createStory(id, data.title, data.url, data.by, data.score, data.kids === undefined ? 0 : data.kids.length, i)

    }
}

// --- Append Stories ---
const stories = $('.stories')

function createStory(id, title, url, author, points, comments, num) {

    // console.log(id, title, url, author, points, comments)

    // Create Story
    const story = $(`
    <div class="story">
    <div class="story-points">
        <div class="story-points-icon"><img src="./ArrowUp.png" alt=""></div>
        <div class="story-points-count">${points}</div>
    </div>
    <div class="story-content">
        <div class="story-author">Submitted by ${author}</div>
        <div class="story-heading">
            <a href=${url}>
                <div class="story-title">${title}</div>
            </a>
        </div>
        <div class="story-subheading">
            <div class="story-comments">${comments} comments</div>
            <div>hide</div>
            <div>share</div>
        </div>
    </div>
    `)

    story.id = id

    // Modify Story Elements
    // story.find('.story-title').remove()

    if (comments === 0) {
        story.find('.story-comments').remove()
    }

    stories.append(story)
}