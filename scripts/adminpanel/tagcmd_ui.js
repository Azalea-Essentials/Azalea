import { ConfiguratorSub as e } from "../configuratorOptions";
import { Database as t } from "../db";
import { ActionForm as o, ModalForm as r } from "../form_func";
import { uiManager as a } from "../uis";
export const TAGCMD_UI = function () {
  return (
    a.addUI("Azalea0.9.0/TagCmd", (e) => {
      let a = new o(),
        n = new t("TagCmdConfig"),
        i = JSON.parse(n.get("Cmds", "[]"));
      for (const e of i)
        a.button(e.name, null, (t, o) => {
          let a = new r();
          a.title(`${e.name}, ${e.tag}`),
            a.textField(
              "Category",
              "Type a category name",
              e.category ? e.category : "Uncategorized",
              () => {}
            ),
            a.textField(
              "Description",
              "Type a description",
              e.description ? e.description : "Uncategorized",
              () => {}
            ),
            a.toggle("Execute on other", !!e.execOther, () => {}),
            a.show(t, !1, (e, t) => {
              let r = t.formValues[0],
                a = t.formValues[1],
                s = t.formValues[2];
              (i[o].category = r),
                (i[o].description = a),
                (i[o].execOther = s),
                n.set("Cmds", JSON.stringify(i));
            });
        });
      a.show(e, !1, (e, t) => {});
    }),
    new e("§eTag commands", "textures/azalea_icons/11").setCallback((e) => {
      a.open("Azalea0.9.0/TagCmd", e);
    })
  );
};
