///<reference path="TextInputAnswerParser.ts"/>
///<reference path="../answer/textAnswer/TextViewAnswer.ts"/>
class TextViewAnswerParser extends TextInputAnswerParser{
    protected answer:TextViewAnswer;

    protected createAnswer():TextInputAnswer{
        return new TextViewAnswer();
    }
}
