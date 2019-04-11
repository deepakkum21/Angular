package com.stpl.jobscheduler.config;

import org.quartz.Job;
import org.quartz.SchedulerContext;
import org.quartz.spi.TriggerFiredBundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.scheduling.quartz.SpringBeanJobFactory;

public final class AutowiringSpringBeanJobFactory extends SpringBeanJobFactory implements ApplicationContextAware {

    private static final Logger LOG = LoggerFactory.getLogger(AutowiringSpringBeanJobFactory.class);

    private ApplicationContext ctx;
    private SchedulerContext schedulerContext;

    @Override
    public void setApplicationContext(final ApplicationContext context) {
        this.ctx = context;

    }

    @Override
    protected Object createJobInstance(final TriggerFiredBundle bundle) throws Exception {
        Job job = ctx.getBean(bundle.getJobDetail().getJobClass());
    LOG.info("job------------------"+job);
        BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(job);
        MutablePropertyValues pvs = new MutablePropertyValues();
        LOG.info("job------------------"+bundle.getJobDetail());
        pvs.addPropertyValues(bundle.getJobDetail().getJobDataMap());
        pvs.addPropertyValues(bundle.getTrigger().getJobDataMap());
        if (this.schedulerContext != null) {
            pvs.addPropertyValues(this.schedulerContext);
        }
        bw.setPropertyValues(pvs, true);
        return job;
    }

    public void setSchedulerContext(SchedulerContext schedulerContext) {
        this.schedulerContext = schedulerContext;
        super.setSchedulerContext(schedulerContext);
    }

}