// schemas/donationAccounts.js

export default {
  name: "donationAccounts",
  title: "Donation Accounts",
  type: "document",
  // Only one document of this type should exist
  __experimental_actions: ["update", "publish", "unpublish"],
  fields: [
    {
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Shown above the account numbers e.g. 'Our Bank Accounts'",
      initialValue: "Our Bank Accounts",
    },
    {
      name: "note",
      title: "Donor Note",
      type: "text",
      rows: 2,
      description: "Short note shown below the accounts e.g. 'Send proof of payment to...'",
      initialValue: "After donating, please send proof of payment to consulting@renownedchildinitiative.org",
    },
    {
      name: "accounts",
      title: "Bank Accounts",
      type: "array",
      of: [
        {
          type: "object",
          name: "account",
          title: "Account",
          fields: [
            {
              name: "bankName",
              title: "Bank Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "accountName",
              title: "Account Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "accountNumber",
              title: "Account Number",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "currency",
              title: "Currency",
              type: "string",
              options: {
                list: [
                  { title: "Nigerian Naira (NGN)", value: "NGN" },
                  { title: "US Dollar (USD)", value: "USD" },
                  { title: "British Pound (GBP)", value: "GBP" },
                  { title: "Euro (EUR)", value: "EUR" },
                ],
              },
              initialValue: "NGN",
            },
            {
              name: "sortCode",
              title: "Sort Code / Routing Number (optional)",
              type: "string",
            },
            {
              name: "swiftCode",
              title: "SWIFT / BIC Code (optional)",
              type: "string",
              description: "For international transfers only",
            },
          ],
          preview: {
            select: {
              title: "bankName",
              subtitle: "accountNumber",
            },
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
    },
  },
};