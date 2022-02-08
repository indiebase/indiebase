/**
 * 创建sql函数选出所有子树节点
 */
export const POSSESSION_GET_CHILD_NODE = `
CREATE FUNCTION \`GET_CHILD_NODE\` (rootId varchar(100))
RETURNS varchar(2000)
BEGIN
DECLARE str varchar(2000);
DECLARE cid varchar(100);
SET str = '$';
SET cid = rootId;
WHILE cid is not null DO
    SET str = concat(str, ',', cid);
    SELECT group_concat(id) INTO cid FROM possession where FIND_IN_SET(pid, cid);
END WHILE;
RETURN str;
END
`;

/**
 *
 * 删除节点下包含的所有子树节点
 * @param id 节点id
 * @returns {string}
 */
export const POSSESSION_DELETE = (id) => `delete from possession where id in (
  select * from (
    select id from possession where FIND_IN_SET(id, GET_CHILD_NODE(${id}))
  ) as p
)`;

/**
 *
 * 选出节点下包含的所有子树节点
 * @param id 节点id
 * @returns {string}
 */
export const POSSESSION_SELECT = (id) =>
  `select id from possession where FIND_IN_SET(id, GET_CHILD_NODE(${id}))`;
