microk8s enable dns helm3 dashboard ingress storage
microk8s ctr images pull registry.aliyuncs.com/google_containers/pause:3.1
microk8s ctr images tag registry.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1
microk8s ctr images pull registry.aliyuncs.com/google_containers/metrics-server:v0.5.0
microk8s ctr images tag registry.aliyuncs.com/google_containers/metrics-server:v0.5.0 k8s.gcr.io/metrics-server/metrics-server:v0.5.0
microk8s ctr images pull docker.io/liangjw/ingress-nginx-controller:v1.0.0-alpha.2
microk8s ctr images tag docker.io/liangjw/ingress-nginx-controller:v1.0.0-alpha.2 k8s.gcr.io/ingress-nginx/controller:v1.0.0-alpha.2

helm install minio/minio:RELEASE.2021-02-14T04-01-33Z --namespace minio --create-namespace --generate-name
