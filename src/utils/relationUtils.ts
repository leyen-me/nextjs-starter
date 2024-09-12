import { PrismaClient } from '@prisma/client';

export async function updateManyToManyRelation<T extends { id: string }>(
    prisma: Omit<PrismaClient, any>,
    params: {
        parentId: string;
        newChildIds: string[];
        relationModel: any;
        parentIdField: string;
        childIdField: string;
    }
) {
    const { parentId, newChildIds, relationModel, parentIdField, childIdField } = params;

    // Get existing relations
    const existingRelations = await relationModel.findMany({
        where: { [parentIdField]: parentId },
        select: { [childIdField]: true },
    });
    const existingChildIds = existingRelations.map((rel: any) => rel[childIdField]);

    // Determine IDs to insert and delete
    const idsToInsert = newChildIds.filter((id: string) => !existingChildIds.includes(id));
    const idsToDelete = existingChildIds.filter((id: string) => !newChildIds.includes(id));

    // Insert new relations
    if (idsToInsert.length > 0) {
        await relationModel.createMany({
            data: idsToInsert.map(childId => ({
                [parentIdField]: parentId,
                [childIdField]: childId
            })),
            skipDuplicates: true,
        });
    }

    // Delete removed relations
    if (idsToDelete.length > 0) {
        await relationModel.deleteMany({
            where: {
                [parentIdField]: parentId,
                [childIdField]: { in: idsToDelete },
            },
        });
    }
}