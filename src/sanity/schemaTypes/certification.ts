export default {
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Certificate Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. "March 2024"',
    },
    {
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify the credential',
    },
  ],
}
