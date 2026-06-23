export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'featured',
            title: 'Is this a Featured Project?',
            type: 'boolean',
            description: 'ඔව් නම්, මේක Featured විදියට පෙන්නයි',
        },
        {
            name: 'isFullStack',
            title: 'Is this a Full Stack Project?',
            type: 'boolean',
            description: 'ඔව් නම්, මේක Full Stack Projects ටැබ් එකේ පෙන්නාවි',
        },
        {
            name: 'techStack',
            title: 'Tech Stack (Technologies used)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'උදාහරණ: React, Tailwind, TypeScript',
        },
        {
            name: 'githubUrl',
            title: 'GitHub Repository URL',
            type: 'url',
        },
        {
            name: 'liveUrl',
            title: 'Live Preview URL (Coming Soon)',
            type: 'url',
        },

    ],
}