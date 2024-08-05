import common from "../common/task-props.mjs";
import builder from "../../common/builder.mjs";
import propsFragments from "../../common/props-fragments.mjs";

export default {
  ...common,
  key: "clickup-create-task-comment",
  name: "Create Task Comment",
  description: "Creates a task comment. See the docs [here](https://clickup.com/api) in **Comments / Create Task Comment** section.",
  version: "0.0.8",
  type: "action",
  props: {
    ...common.props,
    commentText: {
      label: "Comment Text",
      description: "The text of the comment",
      type: "string",
    },
    notifyAll: {
      label: "Notify All",
      description: "Will notify all",
      type: "boolean",
      default: false,
      optional: true,
    },
    assignees: {
      propDefinition: [
        common.props.clickup,
        "assignees",
        (c) => ({
          workspaceId: c.workspaceId,
        }),
      ],
      optional: true,
    },
    listWithFolder: {
      propDefinition: [
        common.props.clickup,
        "listWithFolder",
      ],
    },
  },
  additionalProps: builder.buildListProps({
    tailProps: {
      taskId: propsFragments.taskId,
    },
  }),
  async run({ $ }) {
    const {
      taskId,
      commentText,
      notifyAll,
      assignees,
    } = this;

    const params = this.clickup.getParamsForCustomTaskIdCall(
      this.useCustomTaskIds,
      this.authorizedTeamId,
    );

    const response = await this.clickup.createTaskComment({
      $,
      taskId,
      data: {
        comment_text: commentText,
        notify_all: notifyAll,
        assignees,
      },
      params,
    });

    $.export("$summary", "Successfully created task comment");

    return response;
  },
};
