const os = require("os");

const getCPUusage = () => {
    const cpu_details = os.cpus();
    let idle_time = 0, total_time = 0;

    cpu_details.forEach(value => {
        for (key in value.times) {
            total_time = total_time + value.times[key]
        }
        idle_time = idle_time + value.times.idle
    });

    const avg_idle_time = idle_time / cpu_details.length;
    const avg_total_time = total_time / cpu_details.length;
    const usage = 100 - (avg_idle_time / avg_total_time * 100);

    return usage.toFixed(2);
}

module.exports = getCPUusage