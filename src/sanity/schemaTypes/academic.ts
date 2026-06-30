export default {
  name: 'academic',
  title: 'Academic & Campus Activity',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'institution',
      title: 'Institution / University',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. "November 2024"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'image',
      title: 'Activity Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'youtubeLink',
      title: 'YouTube Video Link',
      type: 'url',
      description: 'Link to a campus project video, viva, or presentation',
    },
  ],
}
