let controller = new ScrollMagic.Controller();

const fadein = (selector) => {
	var fadeInTimeline = new TimelineMax();
	var fadeInFrom = TweenMax.from(selector, 1, {
		autoAlpha: 0,
	});
	var fadeInTo = TweenMax.to(selector, 1, {
		autoAlpha: 1,
	});
	fadeInTimeline.add(fadeInFrom).add(fadeInTo);
	return fadeInTimeline;
};

const makeCanvas = (container, label, dataset, colorset) => {
	cont = container.getContext("2d");
	res = new Chart(cont, {
		type: "doughnut",
		data: {
			labels: label,
			datasets: [
				{
					data: dataset,
					backgroundColor: colorset,
				},
			],
		},
		height: 100,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: true,
					text: "Chart.js Doughnut Chart",
				},
			},
		},
	});
	return res;
};

const makeBarCanvas = (container, thelabels, dataset, colorset) => {
	cont = container.getContext("2d");
	res = new Chart(cont, {
		type: "bar",
		data: {
			labels: thelabels,
			datasets: [
				{
					label: "Extent",
					data: dataset,
					backgroundColor: colorset,
				},
			],
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
		},
	});
	return res;
};

makeCanvas(
	document.getElementById("stats__malnourishment"),
	["Malnourished people in Mongolia", "Nourished people in Mongolia"],
	[35, 65],
	["red", "green"]
);

makeCanvas(
	document.getElementById("stats__ulaanbaatar_food"),
	[
		"People with proper access to food in Ulaanbaatar",
		"People without proper access to food in Ulaanbaatar",
	],
	[68, 32],
	["gold", "lightgreen"]
);

makeCanvas(
	document.getElementById("stats_fiveyr_olds"),
	[
		"Healthy Mongolian 0-5 year olds",
		"Anemic Mongolian 0-5 year olds",
		"Undernourished Mongolian 0-5 year olds",
	],
	[13, 20, 80],
	["red", "orange", "lightgreen"]
);

makeBarCanvas(
	document.getElementById("stats_vitad"),
	["Children Under 5", "Pregnant Women", "Men"],
	[90, 95, 85],
	["orange", "red", "gold"]
);

makeBarCanvas(
	document.getElementById("stats_iron"),
	["Very young children", "Pregnant Women"],
	[21, 30],
	["orange", "gold"]
);

makeBarCanvas(
	document.getElementById("genInfo_howbad_chart"),
	[
		"Food source ran very low",
		"Worried about not having enough food",
		"Had to eat less food",
	],
	[72, 47, 34],
	["red", "yellow", "lightgreen"]
);

new ScrollMagic.Scene({
	triggerElement: "#stats",
	triggerHook: 0.7,
})
	.setTween(fadein(document.querySelectorAll("#stats > *")[0]))
	.duration(700)
	.addTo(controller);

for (let i = 1; i < document.querySelectorAll("#stats > *").length; i++) {
	new ScrollMagic.Scene({
		triggerElement: document.querySelectorAll("#stats > *")[i - 1],
		triggerHook: "onEnd",
	})
		.setTween(fadein(document.querySelectorAll("#stats > *")[i]))
		.duration(1000)
		.addTo(controller);
}

answers = {
	defprob:
		"In Mongolia, a poor country to the north of China, many people are going hungry. We need to stop this.",
	chooseWhat:
		"I have chosen the second global goal of No Hunger. I choose this goal for the following reason: You can be poor and still be alive, but you cannot be alive without food. I have heard of how poor and hungry Mongolians are, and that is really saddening, as you know that without help, these hungry Mongolians will likely die. ",
	howBad:
		"Most of the people affected are impoverished people usually in the countryside, who usually are traditional Mongolian herders. The thing is, 28.4% of Mongolia lives below the poverty line, which is a lot. 22% of Mongolia do not have regular food sources to live a healthy life. Also, during COVID:",
	dontDoAnything:
		"If this hunger problem is not solved, then many people will stave, which usually leads to death. Moreover, many Mongolians are forced to take out loans which they cannot pay back to feed themselves. So, if they don’t die, Mongolians will end up in a financial crisis. ",
	scienceFactors:
		"Yes! The main reason that this hunger is happening is because of something called a dzud. A dzud is a harsh winter after a dry summer. During dzuds, the pastures that livestock graze on are frozen solid under deep snow. Livestock, which hearding families rely on for food, transportation, and income do not survive dzuds. Due to climate change, dzuds have become very common. ",
	personalStory:
		"Shaariibuu Luttumur is a Mongolian herder. Like many other headers, he is struggling with debt. In dzuds, herders find it very difficult to feed their livestock, so they are forced to take out loans to buy food. These loans have sent Shaariibuu and many other herders into a financial crisis. He recalls that he would have “taken out another loan to get [himself] all through the winter” Luckily, the Food and Agriculture Organization of the United Nations (FAO) intervened, and sent him some money and 846 kg of concentrated feed. Shaariibuu is now out of debt and can care for his animals now.",
	sol1ex:
		"Dzuds, the main cause of hunger in Mongolia have been increasingly common over the years due to climate change. Thus, dzuds can become less common if climate change is minimized ",
	sol2ex:
		"Unfortunately, not everyone knows about the global goals. Surveys found that only between 28-45% of people have even heard of the global goals. Imagine if the rest of the 55-72% of the world population knew about the global goals. Many more people would be aware, and hence, more people can make a difference. ",
	sol3ex:
		"Donating money is one of the simplest things you can do, but it is one of the most powerful things that can be done. According to the FAO, a organization working in Mongolia, every 1 US Dollar they spent resulted in 7.1 US Dollars in benefits in households ",
	sol4ex:
		"As stated above, the main reason of hunger in Mongolia is livestock dying in dzuds. Therefore, you can save herders by making a shelter for their animals. ",
	sol5ex:
		"Livestock starve to death due to a lack of grass when the ground is frozen solid during dzuds. Mongolians depend on these livestock for many things which include food. Hence, by feeding these livestock, you can save them. ",
	sol1pro:
		"Despite how much money or awareness you raise, dzuds will still be a thing due to climate change. You can uproot this problem with this solution.",
};

document.querySelectorAll(".fill").forEach((e) => {
	e.innerHTML += answers[e.getAttribute("name")];
});