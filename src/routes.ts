import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c96eb3ffd9b847",
      pass: "bd7fd846e2d9cf"
    }
  });

routes.post('/feedbacks', async (req, res) => {
    
    const { type, comment, screenshot } = req.body
    console.log(type,comment,screenshot)
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })
    await transport.sendMail({
        from: 'Feedget Team <hello@feedget.com>',
        to: 'Luca Alfaro Rampinelli <site.owner@site.com>',
        subject:'New feedback registered!',
        html:[
            `<div style="font-family: Calibri,sanserif; font-size:16px; color:gray">`,
            `<p>Feedback type: ${type}</p>`,
            `<p>Feedback comment: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    })

    return res.status(201).json({ data: feedback })
    });
