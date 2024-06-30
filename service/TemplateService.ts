"use server";

import getSession from "@/lib/session";
import { TEMPLATE_TYPE } from "@/lib/templateUtil";
import { selectTemplates } from "@/repository/templateRepository";

export async function findTemplates() {
  const session = await getSession();
  const result = await selectTemplates(session.id!);
  if (result.length === 0) {
    return [
      {
        tempalte: {
          type: Object.keys(TEMPLATE_TYPE)[0],
          name: TEMPLATE_TYPE.MORE,
        },
      },
    ];
  } else {
    return result;
  }
}
