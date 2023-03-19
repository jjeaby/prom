const {Registry, Pushgateway, Gauge} = require('prom-client');

const register = new Registry()

const guageSample = new Gauge({
    name: 'guageSample',
    help: 'guageSample',
    registers: [register],
})


const auth = `<id>:<pw>`;
const pushUrl = `http://${auth}@<ip_addr>:<port>`
const jobName = "job"
const instanceName = "instance"

const main = (async function () {
    guageSample.set(parseFloat("10000"))
    const gateway = new Pushgateway(pushUrl, [], register)
    await gateway.push({
        jobName: jobName,
        groupings: {instance: instanceName}
    })

})
()

