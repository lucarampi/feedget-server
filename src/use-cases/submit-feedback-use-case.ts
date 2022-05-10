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