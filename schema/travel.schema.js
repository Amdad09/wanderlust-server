import z from 'zod';

export const travelSchema = z.object({
    destination: z
        .string({ error: 'Destination name is required' })
        .trim()
        .min(1, 'Destination name is required')
        .min(3, 'Destination name must be at least 3 characters')
        .max(100, 'Destination name cannot exceed 100 characters'),

    country: z
        .string({ error: 'Country is required' })
        .trim()
        .min(1, 'Country is required')
        .min(3, 'Country must be at least 3 characters')
        .max(60, 'Country cannot exceed 60 characters'),

    category: z.enum(
        ['Beach', 'Mountain', 'City', 'Adventure', 'Cultural', 'Wildlife'],
        { error: 'Please select a category' },
    ),

    price: z
        .number({ error: 'Price must be a number' })
        .int('Price must be a whole number')
        .min(1, 'Price must be at least 1')
        .max(1_000_000, 'Price cannot exceed 1,000,000'),

    duration: z
        .string({ error: 'Duration is required' })
        .trim()
        .min(1, 'Duration is required')
        .regex(
            /^\d+\s*days\s*\/\s*\d+\s*nights$/i,
            'Use the format: 7 Days/6 Nights',
        ),

    departureDate: z.iso
        .date({ error: 'Please select a valid departure date' })
        .transform((v) => new Date(v)),

    imageUrl: z
        .url({
            error: 'Enter a valid image URL, e.g. https://example.com/image.jpg',
        })
        .optional(),

    description: z
        .string()
        .trim()
        .min(5, 'Description must be at least 5 characters')
        .max(1000, 'Description cannot exceed 1000 characters')
        .optional(),
});
