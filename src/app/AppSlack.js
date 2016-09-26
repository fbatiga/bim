import AppConfig from  './AppConfig';


'use strict';

export default class SlackUser {

	constructor(channel, username, icon_emoji , isBot , url){
		    		console.log('SlackUser', channel, username, icon_emoji , isBot , url);

		this.user = {
			channel,
			username,
			icon_emoji,
			isBot
		};

		this.webhookURL = url;
	}

	text( text , image) {

		let payload = {};

		if(this.user.isBot == true){
			payload = {
				attachments: [ {
					text,
					"color": "#3AA3E3"
				}]
			};

			if (image != false){
				payload.attachments.push({
					text : image,
					"color": "#3AA3E3",
					"image_url": image
				});
			}

		}else{

			payload = {
				text,
				attachments: []
			};

			if (image != false){
				payload.attachments.push({
					text : image,
					"image_url": image
				});
			}
		}

		return this.post(payload);
	}

	question(text, buttons, image) {

		let payload = {
			attachments: [ ]
		};


		if (buttons.length > 0){

			let item = {
				text,
				color: "#3AA3E3",
				attachment_type: "default",
				actions: []
			};

			buttons.map((button)=>{
				item.actions.push({
					"name": Math.random(),
					"text": button,
					"type": "button",
					"value": button
				});
			});

			payload.attachments.push(item);

		}

		if (image != false){
			payload.attachments.push({
				text : image,
				"color": "#3AA3E3",
				"image_url": image
			});
		}


		return this.post(payload);
	}

	post(payload) : Promise {

		var data =  { ...this.user, ...payload };
		const body = `payload=${encodeURI(JSON.stringify(data))}`;

		return fetch(this.webhookURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body
		});
	}
}
