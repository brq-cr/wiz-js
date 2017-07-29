import { Wiz, Context } from './wiz';

wiz.listen(new Context({
    input: data.text ? data.text.toLowerCase() : '',
    attachments: data.attachments ? data.attachments : null,
    senderId,
})).subscribe((botAnswer) => {
    console.log(botAnswer);
});