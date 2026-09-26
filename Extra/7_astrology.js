const button = document.getElementById('button');
const result = document.getElementById('result');

let hr_name = document.getElementById('horoscope_name');
let hr_sign = document.getElementById('horoscope_sign');

let pred1 = document.getElementById('pred1');
let pred2 = document.getElementById('pred2');
let pred3 = document.getElementById('pred3');
let pred4 = document.getElementById('pred4');

button.addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let date = document.getElementById('dob');

    let day = date.value.split('-')[2];
    let month = date.value.split('-')[1];
    let year = date.value.split('-')[0];

    console.log(name, day, month, year);

    hr_name.textContent = ` Dear ${name} Your Zodiac Sign is: `;
    hr_sign.textContent = getZodiac(day, month);

    pred1.textContent = predictions[getZodiac(day, month)][0];
    pred2.textContent = predictions[getZodiac(day, month)][1];
    pred3.textContent = predictions[getZodiac(day, month)][2];
    pred4.textContent = predictions[getZodiac(day, month)][3];
});

function getZodiac(day, month) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        return "Aries";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        return "Taurus";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return "Gemini";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        return "Cancer";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        return "Leo";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        return "Virgo";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        return "Libra";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        return "Scorpio";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        return "Sagittarius";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
        return "Capricorn";
    } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        return "Aquarius";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "Pisces";
    }
}

predictions = {
    "Aries": [
        "Today is a great day to start something new.",
        "You will find success in your endeavors.",
        "Your intuition will guide you well.",
        "Be open to new opportunities."
    ],
    "Taurus": [
        "Steady progress is expected in your career.",
        "Take time to appreciate the simple things in life.",
        "Your dedication will be rewarded.",
        "A friend will offer valuable advice."
    ],
    "Gemini": [
        "Communication will be key to your success today.",
        "You will meet someone who shares your interests.",
        "Keep an open mind to new ideas.",
        "Your curiosity will lead you to interesting places."
    ],
    "Cancer": [
        "Your home life will bring you joy and fulfillment.",
        "Trust your instincts when making important decisions.",
        "A family member will need your support.",
        "Take time to nurture your relationships."
    ],
    "Leo": [
        "Your natural leadership skills will be recognized.",
        "Don't be afraid to take the spotlight when it's yours.",
        "Your creativity will shine through in a big way.",
        "A generous act will bring you unexpected rewards."
    ],
    "Virgo": [
        "Attention to detail will pay off in the long run.",
        "Focus on improving your efficiency and productivity.",
        "A small mistake could have a big impact, so be careful.",
        "Your analytical skills are particularly sharp today."
    ],
    "Libra": [
        "Balance is key to achieving your goals today.",
        "You will find success through cooperation with others.",
        "A romantic interest may develop into something more serious.",
        "Your charm and diplomacy will work in your favor."
    ],
    "Scorpio": [
        "Intense focus on a single goal can lead to great achievements.",
        "Don't let jealousy cloud your judgment or affect your relationships.",
        "You have a powerful intuition that can guide you through difficult times.",
        'Embrace change and transformation as opportunities for growth.'
    ],
    'Sagittarius': [
		'Adventure and exploration are in the cards for you today.',
		'Your optimism and enthusiasm are contagious.',
		'A journey, either physical or metaphorical, is on the horizon.',
		'Expand your horizons by learning something new.'
	],
	'Capricorn': [
		'Determination and hard work will lead to success.',
		'Patience is a virtue that will serve you well.',
		'Focus on building a solid foundation for the future.',
		'Your ambition is admirable, but don\'t forget to enjoy the journey.'
	],
	'Aquarius': [
		'Innovation and originality are highlighted today.',
		'You have a unique perspective that others may not fully understand yet.',
		'The future holds exciting possibilities for you.',
		'Don\'t be afraid to think outside the box.'
  ],
  'Pisces': [
      'Trust your emotions and inner wisdom.',
      'Creativity flows freely through you today.',
      'Empathy and compassion are particularly strong.',
      'A spiritual connection may deepen.'
  ]
};