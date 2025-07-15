const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}


function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = typeof option.nextText === "function"
    ? option.nextText()
    : option.nextText;

    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: 'Someone has stolen your customised office chair. You ordered it specially to accomodate your lower back injury and need it to work safely and comfortably. You can...',
        options: [
            {
                text: 'Politely ask why they took your chair specifically, and see if your office manager can source a second one for them.',
                nextText: () => [2, 3, 4][Math.floor(Math.random() * 3)]
            },
            {
                text: 'Steal the chair back when they are in the bathroom.',
                nextText: () => [5, 6, 7][Math.floor(Math.random() * 3)]
            },
            {
                text: 'Spread malicious gossip about them to your coworkers and hope they quit.',
                nextText: () => [8, 9, 10][Math.floor(Math.random() * 3)]
            },
        ]
    },
    {
        id: 2,
        text: 'They are embarrassed and did not realise you had a specialised chair. They return it and wait for the new one for them to arrive.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 3,
        text: 'They begrudgingly return it, but you can tell they are not happy you complained.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 4,
        text: 'They deny any knowledge of your chair. They claim it was always their chair, and that you are creating a problem out of nothing.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'They return from the bathroom and are perplexed, but take another unremarkable chair from an empty desk and continue working.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'They return from the bathroom and approach your desk, asking if there is a specific reason you always get the best chair, despite other chairs being more ‘up for grabs’.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: 'They return from the bathroom and look visibly annoyed. They use another chair and a new email is in your inbox immediately, manager ccd in.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 8,
        text: 'The chair thief seems completely oblivious to their new status as office pariah. They are still using your chair.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'The chair thief has had a meeting with your manager. After the meeting concludes, you hear they were given a warning by HR but your chair has not been returned yet. ',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'Your other coworkers are completely unimpressed by your gossip, and see you as untrustworthy and irritating.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()