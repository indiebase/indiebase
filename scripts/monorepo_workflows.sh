WORKFLOW_TEMPLATE=$(cat .github/monorepo-template.yaml)

for PACKAGE in $(ls packages); do
    echo "generating workflow for packages/${PACKAGE}"
    WORKFLOW=$(echo "${WORKFLOW_TEMPLATE}" | sed "s/{{PACKAGE}}/${PACKAGE}/g")
    echo "${WORKFLOW}" > .github/workflows/${PACKAGE}.yaml
done