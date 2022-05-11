import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter) {
        this.feedbacksRepository = feedbacksRepository
    }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { comment, type, screenshot } = request;

        if(!type){
            throw new Error('Type is required.')
        }
        if(!comment){
            throw new Error('Comment is required.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot formart. Expected data:image/png;base64 ')
        }


        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: 'New feedback created!',
            body: [
                `<div style="font-family: Calibri,sanserif; font-size:16px; color:gray">`,
                `<p>Feedback type: ${type}</p>`,
                `<p>Feedback comment: ${comment}</p>`,
                `</div>`,
            ].join('\n')
        })

    }
}