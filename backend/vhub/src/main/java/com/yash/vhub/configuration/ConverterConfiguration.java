package com.yash.vhub.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import com.yash.vhub.domain.CompositeProposalCommentIdConverter;
import com.yash.vhub.domain.CompositeRequestCommentIdConverter;


public class ConverterConfiguration implements RepositoryRestConfigurer {

	private CompositeRequestCommentIdConverter compositeRequestCommentIdConverter;

	private CompositeProposalCommentIdConverter compositeProposalCommentIdConverter;

	@Autowired
	public void setCompositeRequestCommentIdConverter(CompositeRequestCommentIdConverter converter) {
		this.compositeRequestCommentIdConverter = converter;
	}

	@Autowired
	public void setCompositeProposalCommentIdConverter(CompositeProposalCommentIdConverter converter) {
		this.compositeProposalCommentIdConverter = converter;
	}
	
	@Override
	public void configureConversionService(ConfigurableConversionService ccs) {
		ccs.addConverter(this.compositeRequestCommentIdConverter);
		ccs.addConverter(this.compositeProposalCommentIdConverter);
	}
	
}
